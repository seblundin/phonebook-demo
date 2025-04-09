import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useAddEntryMutation,
  useDeleteEntryMutation,
  useLazyGetEntriesQuery,
} from "./services/phonebookService";

interface Inputs {
  name: string;
  phoneNumber: string;
}

function App() {
  const [getEntriesQuery, getEntriesState] = useLazyGetEntriesQuery();
  const [addEntryQuery, addQueryState] = useAddEntryMutation();
  const [deleteEntryQuery, deleteQueryState] = useDeleteEntryMutation();
  const [page, setPage] = useState(0);
  const [pagesAvailable, setPagesAvailable] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    getEntriesQuery({ page, size: 5 }, true).unwrap();

    if (getEntriesState.isSuccess) {
      setPagesAvailable(getEntriesState.data.totalPages > page + 1);
    }
  }, [page, getEntriesState.data]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addEntryQuery(data);
    reset();
  };

  if (addQueryState.error || getEntriesState.error || deleteQueryState.error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white rounded-2xl p-2 text-2xl font-bold">
        Something went wrong, please try again later
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between w-4/5 md:w-3/5 lg:w-1/3 mx-auto mt-12 bg-white rounded-3xl px-4 py-7 min-h-[665px]">
      <h1 className="text-4xl text-black font-extrabold">
        PhoneBook, total entries: {getEntriesState.data?.totalElements ?? 0}
      </h1>
      {(getEntriesState.data?.content?.length ?? 0) > 0 && (
        <ul className="flex flex-col my-2 text-2xl font-bold gap-2">
          Current entries:
          {getEntriesState.isFetching ? (
            <li>Loading...</li>
          ) : (
            getEntriesState.data?.content
              .toSorted((a, b) => a.name.localeCompare(b.name))
              .map((entry, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between text-base font-medium p-1 rounded-sm border"
                >
                  {entry.name}, {entry.phoneNumber}
                  <button
                    className="cursor-pointer bg-blue-500 text-white min-w-10 rounded-2xl px-4 py-2 hover:bg-blue-400 active:bg-blue-200"
                    onClick={() => deleteEntryQuery(entry.id)}
                  >
                    Delete
                  </button>
                </li>
              ))
          )}
        </ul>
      )}
      {page > 0 && (
        <button
          className="cursor-pointer bg-blue-500 text-white min-w-10 rounded-2xl self-end px-4 py-2 hover:bg-blue-400 active:bg-blue-200"
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
      )}
      {pagesAvailable && (
        <button
          className="cursor-pointer bg-blue-500 text-white min-w-10 rounded-2xl self-end px-4 py-2 hover:bg-blue-400 active:bg-blue-200"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next Page
        </button>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 my-5"
      >
        <h2 className="text-2xl font-bold">Add number</h2>
        <label className="flex text-lg gap-2 items-center">
          Name
          <input
            className="rounded border border-black p-1"
            {...register("name", {
              required: true,
              validate: (value) => value.trim() !== "" && value.length < 300,
            })}
          />
          {errors.name && (
            <span className="text-red-400">This field is required</span>
          )}
        </label>
        <label className="flex text-lg gap-2 items-center">
          Phone number
          <input
            className="rounded border border-black p-1"
            {...register("phoneNumber", {
              required: true,
              // https://ihateregex.io/expr/phone/
              validate: (value) =>
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
                  value,
                ) || "Invalid phone number",
            })}
          />
          {errors.phoneNumber && (
            <span className="text-red-400">
              {errors.phoneNumber.message || "This field is required"}
            </span>
          )}
        </label>
        <button
          type="submit"
          className="cursor-pointer bg-blue-500 text-white min-w-10 rounded-2xl self-end px-4 py-2 hover:bg-blue-400 active:bg-blue-200"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default App;
