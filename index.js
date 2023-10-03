let userList=["cansu","ayse","ali"]
let getUserList;
let nameListDOM = document.querySelector("#nameList");

//ekrana yazdırma fonksiyonu
//parse:ayrıstırmak

//userListi localStorage kaydettik.
localStorage.setItem("userList",JSON.stringify(userList))

//listeden yükleme işlemi
function Read(){
    nameListDOM.innerHTML="";
    getUserList=JSON.parse(localStorage.getItem("userList"));
    if(getUserList != null){
        if(getUserList.length === 0 ){
            nameListDOM.innerHTML = "There are no any users!"
        }
        else{
            for(let i = 0 ; i < getUserList.length ; i++){
                nameListDOM.innerHTML += `
                    <div class="user-item">
                        <p>
                            <i class="fas fa-user"></i>
                            <span>User : </span>${getUserList[i]}
                        </p>
                        <div class="buttons">
                            <button class="primary" onclick="Edit(${i})">
                                <i class="fas fa-edit"></i>
                                Edit
                            </button>
                            <button class="danger" onclick="Delete(${i})">
                                <i class="fas fa-trash"></i>
                                Delete
                            </button>
                            
                        </div>
                    </div>
                
                `;
            }
        }

    }

}

//ön yüzünde ekleme yapmak
function Create (){
    const storage=JSON.parse(localStorage.getItem("userList"));
    let inputText=document.querySelector("#name").value;
    if(inputText == ""){
        alert("Write a name");
    }else{
        if( storage === null){
        userList.push(inputText);
        localStorage.setItem("userList",JSON.stringify(userList))
        }else{
        userList= JSON.parse(localStorage.getItem("userList"));
        userList.push(inputText);
        localStorage.setItem("userList",JSON.stringify(userList));

        }


    }
   
}

function Delete(item){
    let deleteUser=JSON.parse(localStorage.getItem("userList"));
    deleteUser.splice(item,1);
    localStorage.setItem("userList",JSON.stringify(deleteUser));
    Read();

}

function Edit(item){
    let editUsers=JSON.parse(localStorage.getItem("userList"));
    nameListDOM.innerHTML="";
    for(let i=0; i< editUsers.length;i++){
        if(i == item ){
            nameListDOM.innerHTML += `
            <div class="user-item">
            <div>
            <p>
                <i class="fas fa-user"></i>
                <span>User : </span> ${getUserList[i]}
            </p>
            <input type="text" id="newName" placeholder="${editUsers[i]}"/>
            </div>
         
            <div class="buttons">
                <button class="success" onclick="Update(${i})">
                    <i class="fas fa-edit"></i>
                    Update
                </button>
                <button class="warning" onclick="Read()">
                    <i class="fas fa-trash"></i>
                    Cancel
                </button>
                
            </div>
            </div>

            `
        }else{
            nameListDOM.innerHTML += `
            <div class="user-item">
                <p>
                    <i class="fas fa-user"></i>
                    <span>User : </span>${getUserList[i]}
                </p>
                <div class="buttons">
                    <button class="primary" onclick="Edit(${i})">
                        <i class="fas fa-edit"></i>
                        Edit
                    </button>
                    <button class="danger" onclick="Delete(${i})">
                        <i class="fas fa-trash"></i>
                        Delete
                    </button>
                    
                </div>
            </div>
        
        `;
        }
        
    }
}

function Update(item){
    const updateUsers=JSON.parse(localStorage.getItem("userList"));
    updateUsers[item]=document.getElementById("newName").value;
    if(updateUsers[item] == ""){
        alert("Write a name!")
    }else{
        localStorage.setItem("userList",JSON.stringify(updateUsers));
        Read();

    }

}

//preventDefault sayfa yenilenmesini önlüyor.

document.getElementById("form").addEventListener("submit",(e)=>{
    e.preventDefault();
    Create();
    Read();
    document.getElementById("form").reset();

})


//kodlar yüklendikten sonra okuma işlemi olsun

document.addEventListener("DOMContentLoaded",() => {
    Read()
})