import Head from 'next/head'
import Link from 'next/link'
// import styles from '../styles/Home.module.css'
import {CreateNote} from './new-note'
import Popup from 'reactjs-popup';
import { NotesList } from '../store/notes_store'
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import baseUrl from '../helpers/baseUrl'
import { useToasts } from 'react-toast-notifications'


type Props = {
  dataStore?: NotesList;
};



const Home = inject("dataStore")(
  observer((props: Props) => {
    const dataStore = props.dataStore.notes;
    const { addToast } = useToasts();
 

    async function deleteNote(e,id){
      e.preventDefault();
      const res =  await fetch(`${baseUrl}/api/note/${id}`,{
        method:"DELETE"
      })
     await res.json();
     props.dataStore.deleteNote(id);
     addToast('Successfully Deleted...', {
        appearance: 'success',
        autoDismiss: true,
      })


    }

    function comment(){
      addToast('You can only create ten notes...', {
        appearance: 'info',
        autoDismiss: true,
    })
    }

    return (
      <div className={"container"}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={"main"}>
          <h1 className={"title"}>
          Welcome - <label className="todos">Todos</label>
          </h1>
          <p className={"description"}>
          Create notes and document the tasks you need to perform          </p>
          {dataStore.length>=10 && <label className="l">You can only create ten notes...</label>}


          <div className={"grid"}>
            <div>
                <button className={"card1"} disabled={!(dataStore.length<10)}>
                  <Link  href= {`/new-note`}><div className={"plus"}>+</div></Link>
              </button>                   
            </div>
 

            { dataStore.length > 0  &&  dataStore.map(note => (
                    <div className={"card"}>
                        <Link  href= {`/note/${note._id}`}><div className={"txt"}><a>{note.nameNote}</a></div></Link>
                        <Popup
                            trigger={<button className={"delete"}>Delete</button>}
                            modal
                            nested
                          >
                            {close => (
                              <div className={"modal"}>
                                <button className={"close"} onClick={close}>
                                  &times;
                                </button>
                                <div className={"header"}> Delete - {note.nameNote} </div>
                                <div className={"content"}>
                                  {'Are you sure you want to delete this note ? '}
                                </div>
                                <div className={"actions"}>
                                  <button
                                    className="button-input1"
                                    onClick={(e)=>deleteNote(e,note._id)}
                                  >
                                    Yes
                                  </button>
                                  <button
                                    className="button-input1"
                                    onClick={() => {
                                      console.log('modal closed ');
                                      close();
                                    }}
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            )}
                          </Popup>
                    </div>
              ))}


          </div>
        </main>

        <footer className={"footer"}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '} Hadas Tweeto
          </a>
        </footer>
      </div>
    )
})
);


export default Home 
