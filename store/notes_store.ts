import {action, computed, observable} from 'mobx'
// import { Item} from './items_store'
// import { createContext } from 'react'
import baseUrl from '../helpers/baseUrl'
import initDB from '../helpers/initDB'


// initDB();
 export class Item {
    id = Math.random();
     name = "";
     done = false;
}


export class Note{
    // id = Math.random();
    _id;
    @observable
    nameNote = "";
    @observable
    items: Item[] = [];
    created_at;
    updated_at;
    

    
    @action addItem(name: string) :void {
        const newItem = new Item();
        newItem.name = name;
        newItem.done = false;
        this.items.push(newItem);
    }

    
    @action toggleItem(id: number) : void {
        const idx = this.items.findIndex(item => item.id === id);
        this.items[idx].done = !this.items[idx].done;
    }
}

export class NotesList{
    
    @observable notes:Note[]= [];

    @action
    addNote(note : Note){
        this.notes.push(note);
    }

    @action
    updatNote(note){
        const { id, name, items} = note;
        if(this.notes.findIndex(note => note._id == id)) return;
        this.notes[id].nameNote = name;
        this.notes[id].items = items;
        
    }

    @action
    findNote(id : number){
        const idx = this.notes.findIndex(note => note._id == id);
    }

    @action
    deleteNote(id:number){
        const idx = this.notes.findIndex(note => note._id == id);
        this.notes.splice(idx,1);
    }
}

export default new NotesList()

export function convertToItems(items){
    let todos:Item[]=[];
    items.map( i =>{
        let item = new Item();
        item.id = i.id;
        item.name = i.name;
        item.done = i.done;
        todos.push(item);
    })
    return todos;
}

export async function fetchInitialStoreState() {
    // You can do anything to fetch initial store state
    // return  [
    //     { id:1, nameNote:"Home", todos: [{id:1, name:"Bathroom", done:false},{id:2, name:"leavinigroom", done:true},{id:3, name:"kitchen", done:false}]},
    //     { id:2, nameNote:"Buy", todos: [{id:1, name:"Bathroom", done:false},{id:2, name:"leavinigroom", done:true},{id:3, name:"kitchen", done:false}]},
    //     { id:3, nameNote:"Children", todos: [{id:1, name:"Bathroom", done:false},{id:2, name:"leavinigroom", done:true},{id:3, name:"kitchen", done:false}]}
    // ];
    console.log("----------1----------")
    const res =  await fetch(`${baseUrl}/api/notes`);
    const notes = await res.json()
    console.log("----------2----------",notes)
    const array : Note[] =[];
    notes.map( note =>{
        let n = new Note();
        n._id= note._id;
        n.nameNote = note.nameNote;
        // let todos:Item[]=[];
        // note.items.map( i =>{
        //     let item = new Item();
        //     item.id = i.id;
        //     item.name = i.name;
        //     item.done = i.done;
        //     todos.push(item);
        // })
        n.items = convertToItems(note.items);
        array.push(n);
        
    })

    return array;


  }

