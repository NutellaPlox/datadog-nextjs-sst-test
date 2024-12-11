import Image from "next/image"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const handleBackendLogs = async () => {
    await fetch("/api/test-logs")

    alert("Test backend logs")
  }

  const handleApiCallError = async () => {
    await fetch("/api/test-error")

    alert("Test API call error")
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 gap-8 ${inter.className}`}
    >
      <h1 className="text-4xl font-bold">Datadog Test</h1>
      <div className="flex flex-col gap-4">
        <button
          className="bg-blue-500 p-2 rounded-md"
          onClick={handleBackendLogs}
        >
          Test Backend Logs
        </button>
        <button
          className="bg-red-500 p-2 rounded-md"
          onClick={handleApiCallError}
        >
          Test API Call Error
        </button>
      </div>
    </main>
  )
}
