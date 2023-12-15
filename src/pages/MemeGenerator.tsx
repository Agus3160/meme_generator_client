import { useState, useEffect } from "react"
import getMemesTemplates from "../libs/getMemesTemplates"
import { useQuery, useMutation } from "react-query"
import captionImage from "../libs/captionImage"
import LoadingPage from "./LoadingPage"
import MemeTextInput from "../components/MemeTextInput"
import AddMemeText from "../components/AddMemeText"
import NavigationButtons from "../components/NavigationButtons"
import { Meme } from "../types"
import ErrorPage from "./ErrorPage"

export default function MemeGenerator() {

  const [memeIndex, setMemeIndex] = useState(0)
  const [memeTextInput, setMemeTextInput] = useState<string[]>([])
  const [memeUrl, setMemeUrl] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const { data: memeTemplates, isLoading, isError, error } = useQuery<Meme[]>({
    queryKey: ['memes'],
    queryFn: () => getMemesTemplates(),
    onSuccess: (data) => {
      if (!data || data.length === 0) return
      setMemeUrl(data[memeIndex].url)
      setMemeTextInput(new Array(data[memeIndex].box_count).fill(''))
    },
  })

  const { mutateAsync: generateMeme, isLoading: isLoadingMeme } = useMutation({
    mutationFn: () => {
      setMessage('')
      return captionImage({ template_id: memeTemplates?.[memeIndex]?.id || "-1", boxes: memeTextInput.map((text) => ({ text })) })
    },
    onSuccess: (data: string) => {
      if (!data || memeTemplates === undefined) return
      setMemeTextInput(new Array(memeTemplates[memeIndex].box_count).fill(''))
      setMemeUrl(data)
    },
    onError: (err: Error) => {
      setMessage(err.message)
    }
  })

  useEffect(() => {
    if (memeTemplates && memeTemplates.length > 0) {
      setMemeUrl(memeTemplates[memeIndex].url);
      setMemeTextInput(new Array(memeTemplates[memeIndex].box_count).fill(''));
    }
  }, [memeTemplates, memeIndex]);

  if (isLoading) {
    return <LoadingPage />
  }

  if (isError || !memeTemplates) {
    return <ErrorPage message={error instanceof Error ? error.message : "Something went wrong"} />
  }

  const onChangeMemeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;

    setMemeIndex((prevIndex) => {
      let newIndex = prevIndex;
      if (button.name === 'prev') {
        newIndex = prevIndex - 1 >= 0 ? prevIndex - 1 : prevIndex;
      } else if (button.name === 'next') {
        newIndex = prevIndex + 1 < memeTemplates.length ? prevIndex + 1 : prevIndex;
      }

      setMemeTextInput(new Array(memeTemplates[newIndex].box_count).fill(''));
      setMemeUrl(memeTemplates[newIndex].url);

      return newIndex;
    });
  };

  const onChangeMemeInputText = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newMemeTextInput = [...memeTextInput]
    newMemeTextInput[index] = e.target.value
    setMemeTextInput(newMemeTextInput)
  }

  return (
      <div className="grid sm:grid-cols-2 sm:w-fit sm:mx-auto sm:place-items-center grid-cols-1 gap-5">
        <div className="flex flex-col w-11/12 sm:w-80 shadow-xl self-center h-min self-end justify-center p-3 rounded-md bg-slate-700 h-auto w-11/12 mx-auto gap-3">
          <h2 className="text-white text-xl text-center">Text</h2>
          <MemeTextInput memeTextInput={memeTextInput} onChangeMemeInputText={onChangeMemeInputText} />
          <AddMemeText generateMeme={generateMeme} isLoadingMeme={isLoadingMeme} />
          <NavigationButtons onChangeMemeHandler={onChangeMemeHandler} memeUrl={memeUrl} />
          <p className="text-red-400 text-sm text-center">{message}</p>
        </div>

        <hr className="sm:hidden mx-2"></hr>

        <img className="sm:w-80 mx-auto w-11/12 rounded-xl shadow-xl" src={memeTemplates.length > 0 && !isLoading ? memeUrl : ''}></img>

      </div>
  )
}