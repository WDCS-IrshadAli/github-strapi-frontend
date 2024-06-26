import React, { useState } from "react";
import {
  Table,
  Thead,
  TFooter,
  Tbody,
  Tr,
  Td,
  Th,
} from "@strapi/design-system";
import { Box } from "@strapi/design-system";
import { Flex } from "@strapi/design-system";
import { Button } from "@strapi/design-system";
import { Typography } from "@strapi/design-system";
import { IconButton } from "@strapi/design-system";
import { VisuallyHidden } from "@strapi/design-system";
import { BaseCheckbox } from "@strapi/design-system";
import { TextInput } from "@strapi/design-system";
import {Pencil} from "@strapi/icons";
import {Trash} from "@strapi/icons";
import {Plus} from "@strapi/icons";

function TodoCheckbox({ value, checkboxID, callback, disabled }) {
  const [isChecked, setIsChecked] = useState(value);

  function handleChange() {
    setIsChecked(!isChecked);
    {
      callback && callback({ id: checkboxID, value: !isChecked });
    }
  }

  return (
    <BaseCheckbox
      checked={isChecked}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}

function TodoInput({ value, onChange }) {
  return (
    <TextInput
      type="text"
      aria-label="todo-input"
      name="todo-input"
      error={value.length > 40 ? "Text should be less than 40 characters" : ""}
      onChange={onChange}
      value={value}
    />
  );
}

export default function TodoTable({
  todoData,
  toggleTodo,
  deleteTodo,
  editTodo,
  setShowModal,
}: any) {
  return (
    <Box
      background="neutral0"
      hasRadius={true}
      shadow="filterShadow"
      padding={8}
      style={{ marginTop: "10px" }}
    >
      <Table
        colCount={4}
        rowCount={10}
        footer={
          <TFooter onClick={() => setShowModal(true)} icon={<Plus />} >
            Add a todo
          </TFooter>
        }
      >
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">ID</Typography>
            </Th>

            <Th>
              <Typography variant="sigma">Todo</Typography>
            </Th>

            <Th>
              <Typography variant="sigma">Desc</Typography>
            </Th>

            <Th>
              <Typography variant="sigma">Completed</Typography>
            </Th>

            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {todoData.map((todo: any) => {
            const [inputValue, setInputValue]: any = useState({name: todo.name, desc: todo.desc});

            const [isEdit, setIsEdit] = useState(false);

            return (
              <Tr key={todo.id}>
                <Td>
                  <Typography textColor="neutral800">{todo.id}</Typography>
                </Td>

                <Td>
                  {isEdit ? (
                    <TodoInput
                      value={inputValue.name}
                      onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
                    />
                  ) : (
                    <Typography textColor="neutral800">{todo.name}</Typography>
                  )}
                </Td>

                <Td>
                  {isEdit ? (
                    <TodoInput
                      value={inputValue.desc}
                      onChange={(e) => setInputValue({ ...inputValue, desc: e.target.value })}
                    />
                  ) : (
                    <Typography textColor="neutral800">{todo.desc}</Typography>
                  )}
                </Td>

                <Td>
                  <TodoCheckbox
                    value={todo.isDone}
                    checkboxID={todo.id}
                    callback={toggleTodo}
                    disabled={isEdit}
                  />
                </Td>

                <Td>
                  {isEdit ? (
                    <Flex style={{ justifyContent: "end" }}>
                      <Button
                        onClick={() => editTodo(todo.id, { name: inputValue.name, desc: inputValue.desc })}
                      >
                        Save
                      </Button>
                    </Flex>
                  ) : (
                    <Flex style={{ justifyContent: "end" }}>
                      <IconButton
                        onClick={() => setIsEdit(true)}
                        label="Edit"
                        noBorder
                        icon={<Pencil />}
                      />

                      <Box paddingLeft={1}>
                        <IconButton
                          onClick={() => deleteTodo(todo)}
                          label="Delete"
                          noBorder
                          icon={<Trash />}
                        />
                      </Box>
                    </Flex>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}