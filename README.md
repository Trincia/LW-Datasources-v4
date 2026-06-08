# Lakewatch Datasources v4 Prototype

Interactive UI prototype for the **Databricks Lakewatch** datasource ingest and normalization flow (SIEM / cybersecurity data engineering).

Built on the [Databricks UI Starter Kit](https://github.com/gioa/db-starter-kit) with the DuBois design system and Figma Code Connect mappings.

## Design source

[Figma — Lakewatch Datasources](https://www.figma.com/design/DtRlnrhUzoBLM5nXPgYvlZ/Lakewatch-Datasources)

## Live demo

**[https://lw-datasources-v4.vercel.app/lakewatch/datasources/ingest](https://lw-datasources-v4.vercel.app/lakewatch/datasources/ingest)**

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000/lakewatch/datasources/ingest](http://localhost:3000/lakewatch/datasources/ingest)

## Demo path (v4)

Use the floating **prototype navigator** (bottom center) to walk through screens in order:

| Step | Screen | Route | Figma node |
|------|--------|-------|------------|
| 1 | Ingest — select source | `/lakewatch/datasources/ingest` | `728:24097` |
| 2 | New external datasource | `/lakewatch/datasources/ingest/external` | `715:54169` |
| 3 | Table configuration + preview | `/lakewatch/datasources/ingest/external/configure` | `718:95762` |
| 4 | Bronze table configuration | `/lakewatch/datasources/ingest/external/bronze` | `718:100065` |

Click **Cloud storage** on step 1 to enter the external datasource flow.

## Tech stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4 + DuBois tokens
- shadcn/ui + Radix UI
- Figma Code Connect
