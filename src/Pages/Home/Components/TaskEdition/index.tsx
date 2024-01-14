import * as Dialog from '@radix-ui/react-dialog';
import { Pencil, X } from 'lucide-react';

import './style.css'
import { useRef } from 'react';
import { useTasksAPI } from '../../../../Hooks/useTasksAPI';


export interface TaskEditionProps {
  id: string,
  title: string,
  description: string
}

export function TaskEdition({ id, title, description }: TaskEditionProps) {

  const insertedTitle = useRef<HTMLInputElement | null>(null);
  const insertedDescription = useRef<HTMLInputElement | null>(null);
  const saveButton = useRef<HTMLButtonElement | null>(null);
  const { updateTaskMutation } = useTasksAPI()
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button style={{ padding: '0.5rem' }} className="Button violet"> <Pencil color='white' size={14} /></button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <div className="DialogTitleBox">

            <Dialog.Title className="DialogTitle">Edit task</Dialog.Title>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <X className="X" color="white" size={14} />
              </button>
            </Dialog.Close>

          </div>
          <Dialog.Description className="DialogDescription">
            Update the task here. Click save when you're done.
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              Name
            </label>
            <input onChange={() => {
              if (insertedTitle.current!.value === "" || insertedDescription.current!.value === "") {
                saveButton.current!.disabled = true;
                return
              }
              saveButton.current!.disabled = false;
            }} ref={insertedTitle} className="Input" id="title" defaultValue={title} />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Username
            </label>
            <input
              onChange={() => {
                if (insertedTitle.current!.value === "" || insertedDescription.current!.value === "") {
                  saveButton.current!.disabled = true;
                  return
                }
                saveButton.current!.disabled = false;
              }}
              ref={insertedDescription} className="Input" id="description" defaultValue={description} />
          </fieldset>
          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <Dialog.Close asChild>
              <button
                ref={saveButton}
                onClick={() => {
                  if (insertedDescription.current!.value != description || insertedTitle.current!.value != title) {
                    const updateTask = {
                      id,
                      title: insertedTitle.current!.value,
                      description: insertedDescription.current!.value
                    }
                    updateTaskMutation.mutate(updateTask)
                    return
                  }
                  console.log('No changes to the task')
                }} className="Button green">Save changes</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}