// ////styling and ui
// // import styled from "styled-components";
// import Input from "../../ui/Input";
// import Form from "../../ui/Form";
// import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
// import Textarea from "../../ui/Textarea";
// // import toast from "react-hot-toast";

// //hooks and mutations
// import { useForm } from "react-hook-form";
// import FormRow from "../../ui/FormRow";
// import { useCreateCabin } from "./useCreateCabin";
// import { useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { createEditCabin } from "../../services/apiCabins";

// function CreateCabinForm() {
//   const { register, handleSubmit, reset, getValues, formState } = useForm();

//   const { errors } = formState;

//   const queryClient = useQueryClient();

//   const { isCreating, createCabin } = useCreateCabin();

//   // const onSubmit = (data) => mutate(data);

//   const { mutate: editCabin, isPending: isEditing } = useMutation({
//     mutationFn: ({ newCabinData, cabinId }) =>
//       createEditCabin(newCabinData, cabinId),
//     onSuccess: () => {
//       toast.success("Cabin successfully edited");
//       queryClient.invalidateQueries({ queryKey: ["cabins"] });
//       reset();
//     },
//     onError: (err) => toast.error(err.message || "Could not edit cabin"),
//   });

//   const isWorking = isCreating || isEditing;

//   function onSubmit(data) {
//     const image = typeof data.image === "string" ? data.image : data.image[0];
//     if (isEditSession)
//       editCabin({ newCabinData: { ...data, image }, id: editId });
//     else createCabin({ ...data, image: image }, {
//       onSuccess: () => reset(), 
//     });
//     // mutate({ ...data, image: data.image[0] });
//   }

//   function onError(errors) {
//     console.log(errors);
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       {/* ////////////////////////////////////////////////////////// */}
//       <FormRow label="Cabin name" error={errors?.name?.message}>
//         <Input
//           disabled={isCreating}
//           type="text"
//           id="name"
//           {...register("name", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
//         <Input
//           disabled={isCreating}
//           type="number"
//           id="maxCapacity"
//           {...register(
//             "maxCapacity",
//             { valueAsNumber: true },
//             {
//               required: "This field is required",
//             }
//           )}
//         />
//       </FormRow>

//       <FormRow label="Regular price" error={errors?.regularPrice?.message}>
//         <Input
//           disabled={isCreating}
//           type="number"
//           id="regularPrice"
//           {...register(
//             "regularPrice",
//             { valueAsNumber: true },
//             {
//               required: "This field is required",
//               min: {
//                 value: 1,
//                 message: "Capacity should be at least 1",
//               },
//             }
//           )}
//         />
//       </FormRow>

//       <FormRow label="Discount" error={errors?.discount?.message}>
//         <Input
//           disabled={isCreating}
//           type="number"
//           id="discount"
//           defaultValue={0}
//           {...register(
//             "discount",
//             { valueAsNumber: true },
//             {
//               required: "This field is required",
//               validate: (value) =>
//                 value >= getValues().regularPrice ||
//                 "Discount should be less than regular price",
//             }
//           )}
//         />
//       </FormRow>

//       <FormRow
//         label="Description for website"
//         error={errors?.description?.message}
//       >
//         <Textarea
//           disabled={isCreating}
//           type="number"
//           id="description"
//           defaultValue=""
//           {...register("description", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Cabin photo" error={errors?.image?.message}>
//         <FileInput
//           id="image"
//           accept="image/*"
//           {...register("image", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isCreating}>Add cabin</Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;



import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
          },
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
