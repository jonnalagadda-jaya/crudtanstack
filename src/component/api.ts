import { Students } from "./types";

export async function getStudent(){
    try {
        const response = await fetch("https://studentmgmtapi.vercel.app/api/allStudents")
        if(!response.ok){
            return ("NetWork response was not ok")
        }
        const data = await response.json()
        console.log("Data", data.students)
        return data.students;
    } catch (error) {
        console.log("Error", Error)
    }
}

export async function deleteStudent(student:Students){
    try {
        const response = await fetch("https://studentmgmtapi.vercel.app/api/deleteStudent",{
            method: "POST",
            body: JSON.stringify(student)
        })
        if(!response.ok){
            return ("Network Rsposonse was not ok")
        } 
        await response. json()
    } catch (error) {
        console.log("Error", error)
    }
}

export async function createStudent(student:Students){
    try {
        const response = await fetch("https://studentmgmtapi.vercel.app/api/createStudent",{
            method: "POST",
            body: JSON.stringify(student)
        })
        if(!response.ok){
            return ("Network response was not ok")
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error", error)
    }
}

export async function editStudent(student:Students){
    try {
        const response = await fetch("https://studentmgmtapi.vercel.app/api/editStudent",{
            method:"POST",
            body: JSON.stringify(student)
        })
        if(!response.ok){
            return ("Network Response was not ok")
        }
        const data = await response.json()
        return data;
    } catch (error) {
        console.log("Error", error)
    }
}