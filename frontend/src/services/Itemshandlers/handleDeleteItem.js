import deleteByValue from "../stateUpdaters/delete";


function handleDeleteItem(data,setItems,setClaims,toast){
    
    
    fetch(`http://52.9.35.104:5000/lost_items/${data.id}`,{
     method:"DELETE",
     headers:{
         "Content-Type":"Application/json"
     }
    })
    .then((resp)=>resp.json())
    .then(()=>{
     toast.success("Item deleted successfully");
     deleteByValue(data,setItems)
 })
 }

 export default handleDeleteItem;