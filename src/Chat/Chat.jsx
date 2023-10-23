/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form"
import { socket } from "../socket/configSocket"
import { useState, useEffect } from "react"
import axios from "axios"

export const Chat = ({ receiver }) => {
  const [listMessage, setListMessage] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const { register, handleSubmit } = useForm({
    default: {
      message: "",
    }
  })

  const onSubmit = handleSubmit((data) => {
    socket.emit('private_message', { message: data.message, receiver: receiver }, ({ error, done, dataMessage }) => {
      if (done) {
        setListMessage(prev => ([...prev, dataMessage]))
      }
      setErrorMessage(error)
    })
  })
  useEffect(() => {
    socket.on("message", (data => {
      setListMessage(prev => ([...prev, data]))
    }))
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/conversations/3`)
      .then(res =>{
        const ds=res.data.data.map(item=>JSON.parse(item))
        setListMessage(ds)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="w-full px-5 flex flex-col justify-between">
      <div className="flex flex-col mt-5">
        <div className="flex justify-start mb-4">
          {
            listMessage.map((message, index) => {
              console.log(message)
              return <div key={index}
                className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
              >
                {message.context}
              </div>
            })
          }
        </div>
      </div>
      <form className="py-5" onSubmit={onSubmit}>
        <input
          {...register('message')}
          className="w-full bg-gray-300 py-5 px-3 rounded-xl"
          type="text"
          placeholder="type your message here..."
        />
      </form>
      {
        errorMessage && <p>{errorMessage}</p>
      }
    </div>
  )
}
