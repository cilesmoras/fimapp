import { Pap, papSchema } from "@customTypes/pap.types";
import { CheckIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddPAP, useEditPAP } from "@hooks/usePAP.hook";
import Button from "@ui/Button";
import Panel from "@ui/Panel";
import SpinnerIcon from "@ui/SpinnerIcon";
import SuccessModal from "@ui/SuccessModal";
import TextInput from "@ui/TextInput";
import { SubmitHandler, useForm } from "react-hook-form";

type PapFormProps = {
  papData?: Pap;
};

export default function PapForm({ papData }: PapFormProps) {
  const isAddMode = !papData;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Pap>({
    resolver: zodResolver(papSchema),
    defaultValues: papData
      ? {
          code: papData?.code,
          name: papData?.name,
          description: papData?.description,
        }
      : undefined,
  });

  const CODE_ERROR = errors?.code;
  const NAME_ERROR = errors?.name;
  const DESC_ERROR = errors?.description;

  const insertPAP = useAddPAP();
  const editPAP = useEditPAP(papData?.id);
  const onSubmit: SubmitHandler<Pap> = async (data) => {
    if (isAddMode) {
      await insertPAP.mutateAsync(data);
      reset();
      return;
    }

    await editPAP.mutateAsync(data);
  };

  return (
    <>
      <Panel width="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="font-semibold text-gray-900 text-base mb-4">
            {isAddMode ? "Add new PAP" : "Edit PAP"}
          </h1>
          <div className="space-y-4">
            <TextInput
              name="code"
              control={control}
              label="Code"
              variant={CODE_ERROR && "danger"}
              helpText={CODE_ERROR?.message}
            />
            <TextInput
              name="name"
              control={control}
              label="Name"
              variant={NAME_ERROR && "danger"}
              helpText={NAME_ERROR?.message}
            />
            <TextInput
              name="description"
              control={control}
              label="Description"
              variant={DESC_ERROR && "danger"}
              helpText={DESC_ERROR && DESC_ERROR.message}
            />
          </div>
          <div className="sm:flex sm:justify-end sm:gap-4 mt-4">
            <p className="text-danger-500 self-center text-sm my-4 sm:my-0">
              {isAddMode ? insertPAP.error?.message : editPAP.error?.message}
            </p>
            <Button disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <SpinnerIcon /> Saving...
                </>
              ) : (
                <>
                  <CheckIcon className="-ml-0.5 size-5" aria-hidden="true" />{" "}
                  Save PAP
                </>
              )}
            </Button>
          </div>
        </form>
      </Panel>
      <SuccessModal
        title="Save successfully"
        description="Programs, Activities, Projects (PAPs) has been saved."
        isOpen={insertPAP.isSuccess || editPAP.isSuccess}
        buttonText="Close"
      />
    </>
  );
}
