import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { createRoot, type Root } from 'react-dom/client';
import { flushSync } from 'react-dom';
import ResumeDocument, { getCvFileName } from '../components/ResumeDocument';

const PAGE_WIDTH_MM = 210;
const PAGE_HEIGHT_MM = 297;

function createPageElement(documentRef: Document) {
  const page = documentRef.createElement('div');
  page.className = 'resume-export-page';

  const body = documentRef.createElement('div');
  body.className = 'resume-export-page-body';
  page.appendChild(body);

  return { page, body };
}

function buildExperienceUnits(experienceSection: Element, documentRef: Document) {
  const heading = experienceSection.querySelector('.resume-section-heading');
  const roles = Array.from(experienceSection.querySelectorAll('.resume-role'));

  return roles.map((role, index) => {
    const unit = documentRef.createElement('div');
    unit.className = 'resume-section resume-export-experience-unit space-y-4';

    if (index === 0 && heading) {
      unit.appendChild(heading.cloneNode(true));
    }

    unit.appendChild(role.cloneNode(true));
    return unit;
  });
}

function collectResumeUnits(sourceRoot: HTMLElement) {
  const documentRef = sourceRoot.ownerDocument;

  return Array.from(sourceRoot.children).flatMap((child) => {
    if (!(child instanceof HTMLElement)) {
      return [];
    }

    if (child.classList.contains('resume-section-experience')) {
      return buildExperienceUnits(child, documentRef);
    }

    return [child.cloneNode(true) as HTMLElement];
  });
}

function paginateResume(sourceRoot: HTMLElement, pagesRoot: HTMLElement) {
  pagesRoot.innerHTML = '';

  const units = collectResumeUnits(sourceRoot);
  let { page, body } = createPageElement(sourceRoot.ownerDocument);
  pagesRoot.appendChild(page);

  for (const unit of units) {
    body.appendChild(unit);

    if (body.scrollHeight <= body.clientHeight) {
      continue;
    }

    body.removeChild(unit);
    ({ page, body } = createPageElement(sourceRoot.ownerDocument));
    pagesRoot.appendChild(page);
    body.appendChild(unit);
  }
}

async function waitForExportLayout() {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

async function renderPdfPages(pages: HTMLElement[]) {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  for (const [index, page] of pages.entries()) {
    const imageData = await toPng(page, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
    });

    if (index > 0) {
      pdf.addPage('a4', 'portrait');
    }

    pdf.addImage(imageData, 'PNG', 0, 0, PAGE_WIDTH_MM, PAGE_HEIGHT_MM, undefined, 'FAST');

    const pageRect = page.getBoundingClientRect();
    const scaleX = PAGE_WIDTH_MM / pageRect.width;
    const scaleY = PAGE_HEIGHT_MM / pageRect.height;

    for (const anchor of Array.from(page.querySelectorAll('a[href]'))) {
      if (!(anchor instanceof HTMLAnchorElement)) {
        continue;
      }

      const href = anchor.href?.trim();
      if (!href) {
        continue;
      }

      const linkRect = anchor.getBoundingClientRect();
      const width = linkRect.width * scaleX;
      const height = linkRect.height * scaleY;

      if (width <= 0 || height <= 0) {
        continue;
      }

      const x = (linkRect.left - pageRect.left) * scaleX;
      const y = (linkRect.top - pageRect.top) * scaleY;

      pdf.link(x, y, width, height, { url: href });
    }
  }

  pdf.save(getCvFileName());
}

function renderExportSurface(root: Root) {
  flushSync(() => {
    root.render(
      <div className="resume-export-renderer" aria-hidden="true">
        <div className="resume-export-flow-shell">
          <ResumeDocument rootId="resume-export-source" className="resume-export-content resume-export-stack" />
        </div>
        <div className="resume-export-pages" />
      </div>,
    );
  });
}

export async function downloadResumePdf() {
  const host = document.createElement('div');
  document.body.appendChild(host);

  const root = createRoot(host);

  try {
    renderExportSurface(root);
    await waitForExportLayout();

    const sourceRoot = host.querySelector('#resume-export-source');
    const pagesRoot = host.querySelector('.resume-export-pages');

    if (!(sourceRoot instanceof HTMLElement) || !(pagesRoot instanceof HTMLElement)) {
      throw new Error('Resume export surface failed to render.');
    }

    paginateResume(sourceRoot, pagesRoot);
    await waitForExportLayout();

    const pages = Array.from(host.querySelectorAll('.resume-export-page')).filter(
      (page): page is HTMLElement => page instanceof HTMLElement,
    );

    if (!pages.length) {
      throw new Error('No export pages were generated.');
    }

    await renderPdfPages(pages);
  } finally {
    root.unmount();
    host.remove();
  }
}