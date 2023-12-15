import DownloadButton from "./DownloadButton"

type Props = {
    memeUrl: string
    onChangeMemeHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function NavigationButtons({onChangeMemeHandler, memeUrl}: Props) {
  return (
    <div className="flex justify-center mx-auto gap-3">
        <button className=" bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" name="prev" onClick={(e) => onChangeMemeHandler(e)}>&lt;</button>
            
        <DownloadButton imageUrl={memeUrl} />

        <button className=" bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" name="next" onClick={(e) => onChangeMemeHandler(e)}>&gt;</button>
    </div>
  )
}