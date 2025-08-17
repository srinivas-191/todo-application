document.addEventListener("DOMContentLoaded", () => loadData());

//accessing all list elements
let userDataElement = document.querySelector(".user-input");
let userInputDate = document.querySelector(".input-date");
let addBtn = document.querySelector(".add-btn");

addBtn.addEventListener("click", (e) => {
  let userData = e.target.parentElement;
  let inputValue = userData.querySelector(".user-input").value;
  let inputDate = userData.querySelector(".input-date").value;
  if (inputValue == "" || inputDate == "") {
    alert("fill all the fields");
  } else {
    let dataItem = {
      inputData: inputValue,
      inputDate: inputDate,
    };
    addToList(dataItem);
  }
});
let listItems = [];

function addToList(dataItem) {
  let existIngListItem = listItems.find((ele) =>ele.inputData == dataItem.inputData && ele.inputDate == dataItem.inputDate);
  if (existIngListItem) {
    return existIngListItem;
  } else {
    listItems.push(dataItem);
  }
  // localStorage.setItem("itemData",JSON.stringify(dataItem))
  localStorage.setItem("listData", JSON.stringify(listItems));
  loadData();
}
function loadData() {
  let localDataItems = localStorage.getItem("listData");
  if (localDataItems) {
    listItems = JSON.parse(localDataItems);
    displayData();
  }
}
function displayData() {
  let listBody = document.querySelector(".list-Items");
  listBody.innerHTML = ``;
  listItems.forEach((ele,i) => {
    let listRow = document.createElement("tr");
    listRow.className = "text-end";
    listRow.innerHTML = `<td class="row-input">
              <p class="edit-input-value">${ele.inputData}</p>
              <input type="text" name="" id="" class="edit-input"><br>
            </td>
            <td class="row-date">
              <p class="edit-date-value">${ele.inputDate}</p>
              <input type="date" name="" id="" class="edit-date">
            </td>
            <td class="btns">
            <button class="btn btn-success save-btn text-white">save</button>
            <button class="btn btn-success editBtn text-white">edit</button>
            <button class="btn btn-danger deleteBtn text-white">delete</button>
            </td>`;
            let editBtn=listRow.querySelector(".editBtn")
            let saveBtn=listRow.querySelector(".save-btn")
            saveBtn.style.display="none"
            let editInputValue=listRow.querySelector(".edit-input-value")
            let editDateValue=listRow.querySelector(".edit-date-value")
            editBtn.addEventListener("click",(e)=>{
                console.log("editing")
                editBtn.style.display="none"
                saveBtn.style.display="inline-block"
                let row=e.target.parentElement.parentElement
                let inputValue = editInputValue.innerText;
                let editInput=row.querySelector(".edit-input")
                editInput.style.display="inline-block"
                editInput.value=inputValue
                editInputValue.innerText=""
                let dateValue=editDateValue.innerText;
                let editDate=row.querySelector(".edit-date")
                editDate.style.display="inline-block"
                editDate.value=dateValue
                editDateValue.innerText=""
            })
            saveBtn.addEventListener("click",(e)=>{
              console.log("saving")
              let row=e.target.parentElement.parentElement
              let editedInputValue=row.querySelector(".edit-input").value
              let editedDateValue=row.querySelector(".edit-date").value
              listItems[i].inputData=editedInputValue
              listItems[i].inputDate=editedDateValue
              localStorage.setItem("listData",JSON.stringify(listItems))
              displayData()
            })
            let deleteBtn=listRow.querySelector(".deleteBtn")
            deleteBtn.addEventListener("click",()=>{
              listItems.splice(i,1)
              localStorage.setItem("listData",JSON.stringify(listItems))
              displayData()
            })
    listBody.appendChild(listRow);
  });
}

