import deleteByValue from "../stateUpdaters/delete";

function handleNonExistingDeleteClaim(data,setNonExistingClaim,toast){
      
    fetch(`http://52.9.35.104:5000/claims/${data.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
      }
    })
      .then((resp) => resp.json())
      .then(() => {
        toast.success("Claim deleted Successfully!")
        deleteByValue(data,setNonExistingClaim);
       
      })
      .catch((error) => console.log(error));
    }

export default handleNonExistingDeleteClaim;