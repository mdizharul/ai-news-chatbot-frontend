# News Chatbot Frontend

A beautiful React-based chat interface for the RAG-powered news chatbot.

## 🎨 Features

- ✅ Clean, modern chat UI
- ✅ Real-time message streaming
- ✅ Session management
- ✅ Source citations with links
- ✅ Responsive design (mobile-friendly)
- ✅ Loading indicators
- ✅ Error handling
- ✅ SCSS styling with gradients and animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Backend server running on http://localhost:5000

### Installation

1. **Create project folder**

```bash
mkdir news-chatbot-frontend
cd news-chatbot-frontend
```

2. **Copy all files**
   Copy these files to your project:

- `package.json`
- `vite.config.js`
- `index.html`
- `.env`
- `.gitignore`
- `src/main.jsx`
- `src/App.jsx`
- `src/App.scss`
- `src/index.scss`

3. **Install dependencies**

```bash
npm install
```

4. **Start development server**

```bash
npm run dev
```

The app will open at `http://localhost:3000` 🎉

## 📁 Project Structure

```
news-chatbot-frontend/
├── src/
│   ├── App.jsx          # Main chat component
│   ├── App.scss         # Component styles
│   ├── main.jsx         # Entry point
│   └── index.scss       # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies
├── .env                 # Environment variables
└── README.md            # This file
```

## 🎯 Usage

1. **Make sure backend is running** on http://localhost:5000
2. **Open frontend** at http://localhost:3000
3. **Start chatting!** Ask about latest news

### Example Questions:

- "What are the latest world news?"
- "Tell me about recent technology developments"
- "What's happening in business today?"
- "Any breaking news?"

## 🔧 Configuration

### Environment Variables

Edit `.env` to change the API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

For production deployment, change to your backend URL:

```env
VITE_API_URL=https://your-backend.com/api
```

### Proxy Configuration

The `vite.config.js` includes a proxy to avoid CORS issues in development:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  },
}
```

## 🎨 Customization

### Colors

Edit `src/App.scss` to change the color scheme:

```scss
// Primary gradient
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

// Or use your own colors
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

### Typography

Change fonts in `src/App.scss`:

```scss
font-family: "Your Font", sans-serif;
```

## 📱 Responsive Design

The app is fully responsive and works on:

- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktops
- 🖥️ Large screens

## 🚀 Production Build

Build for production:

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

Preview the production build:

```bash
npm run preview
```

## 🌐 Deployment

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Import your repository
4. Add environment variable:
   - `VITE_API_URL` = your backend URL
5. Deploy!

### Option 2: Netlify

1. Build the project: `npm run build`
2. Go to [Netlify](https://netlify.com/)
3. Drag and drop the `dist` folder
4. Configure environment variables in site settings

### Option 3: GitHub Pages

```bash
npm run build
# Upload dist folder to gh-pages branch
```

## 🐛 Troubleshooting

### "Failed to connect to server"

**Solution:**

- Make sure backend is running on http://localhost:5000
- Check if `VITE_API_URL` in `.env` is correct
- Verify CORS is enabled in backend

### "Network Error"

**Solution:**

- Backend might be down
- Check backend logs
- Restart backend server

### Styling issues

**Solution:**

- Clear browser cache
- Restart development server
- Check if SCSS is properly compiled

### Port already in use

**Solution:**

```bash
# Change port in vite.config.js
server: {
  port: 3001, // Use different port
}
```

## 🎯 Features Breakdown

### Chat Interface

- Real-time messaging
- Auto-scroll to latest message
- Message timestamps
- Role indicators (User/Assistant)

### Session Management

- Automatic session creation
- Reset button to clear history
- Session ID display in footer

### Source Citations

- Clickable news article links
- Multiple sources per response
- Source titles and URLs

### Loading States

- Typing indicator animation
- Disabled inputs during loading
- Visual feedback for all actions

### Error Handling

- Connection error messages
- API error display
- Graceful fallbacks

## 📊 Performance

- **Fast load times** with Vite
- **Optimized builds** with tree-shaking
- **Lazy loading** for better performance
- **Minimal bundle size**

## 🔐 Security

- **XSS protection** with React
- **CORS handling** via proxy
- **Input sanitization**
- **Secure external links** (rel="noopener noreferrer")

## 📈 Future Improvements

- [ ] Markdown rendering for responses
- [ ] File upload support
- [ ] Voice input/output
- [ ] Dark mode toggle
- [ ] Export chat history
- [ ] Search in conversation
- [ ] Code syntax highlighting
- [ ] Image support in messages

## 📄 License

MIT

## 👨‍💻 Author

Md Izharul Ansari

---

**Questions?** Check the troubleshooting section or open an issue!
