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
- **Generated**: Tool entries were manually selected and described, while JSON structuring was assisted using generative AI (ChatGPT / Gemini)  
- **Includes Fields**:  
  - Name  
  - Slug  
  - Category  
  - Pricing  
  - Rating  
  - Short description  
  - Tags  
  - Use cases  
  - Website URL

---

## 💬 Chatbot Integration

- **Model Used**: Google Gemini (via `@google/generative-ai`)  
- **API Key**: Secured using environment variables  
- **Functionality**:  
  - Answers questions about this catalog  
  - Recommends tools based on user needs  
  - Uses conversational context  
- **Limitations**: Only supports tool-related queries

---

## 🛠️ Stack

- **Frontend**: Next.js 14 (App Router, client/server components)  
- **Styling**: Tailwind CSS  
- **State Management**: React `useState`  
- **Data**: Static JSON file (`/data/ai-tools.json`)  
- **AI API**: Google Gemini API via `@google/generative-ai`

---

## 🚀 Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/ai-tools-catalog.git
cd ai-tools-catalog
npm install
npm run dev
```
# Make sure to add your Gemini API key in a .env.local file:
```bash
GOOGLE_API_KEY=your_api_key_here
```

## 📽 Loom Walkthrough
[Watch Walkthrough](https://loom.com/share/your-link-here)

## 🌐 Live Site
[Visit Live App](https://your-vercel-link.vercel.app)

## 🧑‍💻 Author
- **Anuj Soni**
Software Developer, problem solver, and AI enthusiast.

## 📄 License
---

Would you like this saved to a file or automatically added to your GitHub repo?


