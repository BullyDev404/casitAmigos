import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
// import {toast} from "react-hot-toast";
import toast from "react-hot-toast"; ///idk if this should be a named export but it works

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      // alert("cabin deleted");
      toast.success("cabin deleted");

      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },

    // onError: (err) => alert(err.message),
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
