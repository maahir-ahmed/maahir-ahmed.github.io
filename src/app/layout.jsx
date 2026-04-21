import './globals.css'

export const metadata = {
  title: 'Maahir Ahmed - Computer Science Student',
  description: 'Passionate about cybersecurity, technology, audio-visual production and rock climbing.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* Well done! Here's your flag: CTF{D3v3l0p3r_T00ls_4r3_C00l} */}
      <body>{children}</body>
    </html>
  )
}
