
type Props = {
    message: string
}

export default function ErrorPage({message}: Props) {
  return (
    <>
        <h2 className="text-2xl font-bold text-center text-red-500 my-5">Oops! There was an error <br></br>(◡︵◡)</h2>
        <p className="text-red-400 text-sm text-center text-xl">{message}</p>
    </>
  )
}