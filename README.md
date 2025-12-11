# 🧠 AI Tools Catalog

A beautifully crafted, searchable catalog of 30+ AI tools, designed with Next.js and Tailwind CSS. Users can explore tools by category, pricing, or use case. A conversational chatbot assistant is integrated using Google Gemini API for guided tool recommendations.

---

## ✨ Features

- 🗂️ Browse 30+ AI tools with search, filters, and sort options  
- 🧵 Categories like writing, image generation, dev tools, marketing, and more  
- 💬 Chatbot built with Gemini API to recommend tools or answer catalog queries  
- ⚡ Lightning-fast static site built with Next.js 14  
- 🎨 Fully responsive UI with Tailwind CSS  
- 🔍 Tools sorted by rating, pricing model, or category  
- 🔗 Link to each tool's official website  
- 🧪 Manual and AI-assisted data curation  
- ☁️ Deployed on Vercel

---

## 📊 Dataset

- **Source**: Curated using publicly available AI tool listings (e.g., Product Hunt, There’s An AI For That)
- **Generated**: Tool data (name, description, etc.) selected manually; JSON formatting and consistency assisted using AI tools like ChatGPT and Gemini.
- **Dataset file**: [`/data/ai-tools.json`](./data/ai-tools.json)

---

## 💬 Chatbot Integration

- **Model Used**: Google Gemini (via `@google/generative-ai`)
- **API Key**: Secured via `.env.local`
- **Capabilities**:
  - Recommends tools based on queries (e.g., “Best free tools for designers”)
  - Explains how the site works
  - Uses conversational history to guide replies

---

## 🛠️ Tech Stack & Design Inspiration

- **Tech Stack**:
  - [Next.js 14](https://nextjs.org/) – App Router, dynamic routes, API routes
  - [Tailwind CSS](https://tailwindcss.com/) – UI styling
  - [Google Gemini API](https://ai.google.dev/) – chat assistant
  - [Vercel](https://vercel.com/) – deployment
- **Design Inspiration**:
  - Clean, compact cards inspired by Product Hunt
  - Glassy UI and assistant drawer inspired by shadcn/ui, Raycast aesthetic

---

## 🤖 AI Prompts Used

Here are a few examples of prompts used to assist with structuring and curating data:

1. `Format this list of tools into consistent JSON objects including fields like name, category, tags, pricing, rating, description, and use cases.`
2. `Write 1–2 line descriptions for these AI tools in a tone suitable for a product catalog.`
3. `Generate categories and relevant tags for a tool like Midjourney.`

---

## 🚀 Getting Started

```bash
git clone https://github.com/anujsoni3/ai-tools-catalog.git
cd ai-tools-catalog
npm install
npm run dev

```
# Make sure to add your Gemini API key in a .env.local file:
```bash
GOOGLE_API_KEY=your_api_key_here
```
## 🔧 What Would I Improve With 2 More Days?

- Add pagination or infinite scroll on the listing page
- Enhance the chatbot with keyword-based fallback recommendations
- Connect the tool detail pages with auto-generated blog-style insights using AI
- Store chat history in local storage or Supabase for continuity

## 📽 Loom Walkthrough
[Watch Walkthrough](https://loom.com/share/your-link-here)

## 🌐 Live Site
[Visit Live App](https://your-vercel-link.vercel.app)

## 🧑‍💻 Author
- **Anuj Soni**
Software Developer, problem solver, and AI enthusiast.
