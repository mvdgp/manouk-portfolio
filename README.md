# Manouk van Draanen | Personal Portfolio Website

[![Live Site](https://img.shields.io/badge/Live%20Site-manoukvandraanen.com-7b5800?style=flat-square)](https://manoukvandraanen.com/)

A clean, responsive personal portfolio website showcasing my engineering work, technical background, and downloadable resume.

## Built With

- Frontend: React 19, Vite 6, Tailwind CSS 4
- Animation: Motion
- UI: Lucide React
- Resume Export: jsPDF, html-to-image, qrcode.react
- Tools: TypeScript, npm

## Key Features

- Fully responsive portfolio layout for desktop and mobile browsers.
- Data-driven content managed from a single JSON source.
- Direct browser-side PDF resume export with clickable links and QR code.
- Contact form integration powered by Formspree.

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js 20 or higher
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mvdgp/manouk-portfolio.git
```

2. Navigate to the project directory:

```bash
cd manouk-portfolio
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Production Build

```bash
npm run build
```

### Type Check

```bash
npm run lint
```

## Content Management

Most editable portfolio content lives in [src/portfolioData.json](src/portfolioData.json), including:

- personal details
- social links
- featured projects
- skills and proficiency data
- work experience
- education and certifications

That file is exposed to the app through [src/data.ts](src/data.ts), so content updates usually do not require component changes.

## Resume PDF Export

The resume is generated directly in the browser from the app's own content and styling.

Relevant files:

- [src/components/ResumeDocument.tsx](src/components/ResumeDocument.tsx)
- [src/resume/downloadResumePdf.tsx](src/resume/downloadResumePdf.tsx)
- [src/index.css](src/index.css)

The exported PDF includes clickable contact links and a portfolio QR code.


## Project Structure

```text
src/
  components/         Page sections and shared UI components
  resume/             Browser-side resume PDF export logic
  data.ts             Typed exports for portfolio content
  portfolioData.json  Main content source
  index.css           Global UI styles and export styling
```

## License

No license file is currently included in this repository.

---

Connect with me on [LinkedIn](https://linkedin.com/in/manouk-van-draanen/) or view the code on [GitHub](https://github.com/mvdgp)!
