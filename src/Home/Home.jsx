
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { socket } from "../socket/configSocket"
import { Chat } from "../Chat/Chat"

export const Home = () => {
  
  const [friends, setFriends] = useState([])
  const [error, setError] = useState("")
  const [receiver,setReceiver] = useState("")
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: ""
    }
  })

  useEffect(() => {
    socket.connect()
    socket.on('listFriend', listFriend => {
      setFriends(listFriend)
    })
    socket.on('disconnect', (reason) => {
      console.log(reason)
    })
    socket.on("connect_error", (err) => {
      console.log(err.data); 
    });
    return () => {
      socket.disconnect()
    }
  }, [])

  const onSubmit = handleSubmit((data) => {
    socket.emit("Addfriend", data.username, ({ errmg, done, Friend }) => {
      if (done) {
        setFriends(prev => ([Friend, ...prev]))
      }
      setError(errmg)
    })
  })

  return (
    <div className="container mx-auto shadow-lg rounded-lg">
      <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">

        <div
          className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center"
        >
          RA
        </div>
      </div>
      <div className="flex flex-row justify-between bg-white">
        <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
          <form className="border-b-2 py-4 px-2" onSubmit={onSubmit}>
            <input
              {...register("username")}
              type="text"
              placeholder="search chatting"
              className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
            />
            <button type="submit">thêm</button>
          </form>
          {
            error && <p className="text-[red]">{error}</p>
          }
          {
            friends.map((friend, index) => {
              return <div key={index} className="flex flex-row py-4 px-2 justify-center items-center border-b-2" onClick={
                ()=>setReceiver(friend.userid)
                }>
                <div className="text-lg font-semibold">{friend.nameFriend}</div>
                <div className={`${friend.connected === 'true' ? "bg-[blue]" : "bg-[red]"}`}>
                  <div>status</div>
                </div>
              </div>
              
            })
          }
        </div>
       <Chat receiver={receiver} />
      </div>
    </div>
  )
}
