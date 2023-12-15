type Props = {
    imageUrl: string;
}

const DownloadButton = ({ imageUrl }: Props) => {
    const handleDownload = async () => {
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = Date.now().toString()
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    }


  return (
    <button onClick={async () => await handleDownload()} className="w-30 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Download</button>
  )
}

export default DownloadButton
