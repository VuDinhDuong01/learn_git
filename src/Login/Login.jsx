import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"
import { useLoginMutation } from "../store/userApi"
export const Login = () => {
    const [login ,] = useLoginMutation()
    const navigate= useNavigate()
    const {register,handleSubmit} = useForm({
        default:{
            username:"",
            password:"",
        }
    })
    
    const onSubmit =handleSubmit(async data=>{
        try{
          const response =  await login(data).unwrap()
          navigate('/home')
          localStorage.setItem("token",response.token)
          localStorage.setItem("profile",JSON.stringify(response.data))
        }catch(err){
            console.log(err)
        }
    })
    
  return (
    <form action="" onSubmit={onSubmit}>
        <input type="text" {...register("username")} className=" border-2 border-[red]"/>
        <input type="text" {...register("password")} className="border-2 border-[red]"/>
        <button>đăng nhập</button>
    </form>
  )
}
