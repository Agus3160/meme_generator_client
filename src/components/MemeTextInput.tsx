
type Props = {
    onChangeMemeInputText: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
    memeTextInput: string[]
}

export default function MemeTextInput({onChangeMemeInputText, memeTextInput}: Props) {
  return (
    <>
        {
            memeTextInput.map((text, index) => (
                <input onChange={(e) => onChangeMemeInputText(e, index)} key={index} value={text} className="p-2 rounded-md" type="text" placeholder={`Text ${index + 1}`}></input>
            ))
        }
    </>
  )
}