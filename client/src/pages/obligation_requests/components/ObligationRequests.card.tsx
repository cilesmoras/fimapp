import {
  ObligationRequest,
  ViewObligationRequest,
} from "@customTypes/ObligationRequest.types";
import Customlink from "@ui/CustomLink";

type ObligationRequestCardProps = {
  obligationRequest: ViewObligationRequest;
  handleDelete: (obligationRequest: ObligationRequest) => void;
};

export default function ObligationRequestCard({
  obligationRequest,
  handleDelete,
}: ObligationRequestCardProps) {
  const {
    id,
    serial_no,
    payee,
    payee_office,
    particulars,
    date,
    total_amount,
  } = obligationRequest;
  return (
    <li
      key={id}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm text-gray-900">{serial_no}</h3>
            <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {new Date(date).toDateString()}
            </span>
          </div>
          <p className="mt-1 truncate text-gray-900 font-medium">{payee}</p>
          <p className="mt-1 truncate text-sm text-gray-500">{payee_office}</p>
          <p className="mt-1 truncate text-sm text-gray-500">{particulars}</p>
          <p className="mt-1 truncate text-gray-900 font-medium">
            ₱{Number(total_amount)?.toLocaleString() ?? 0}
          </p>
          <div className="flex gap-x-4 text-sm mt-4">
            <Customlink to={`/obligation-requests/${id}/edit`}>Edit</Customlink>
            <span
              onClick={() => handleDelete(obligationRequest)}
              className="hover:cursor-pointer hover:text-primary-900 font-semibold text-primary-600"
            >
              Delete
            </span>
          </div>
        </div>
        {/* <img
          className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
          src={person.imageUrl}
          alt=""
        /> */}
      </div>
      {/* <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a
              href={`mailto:${person.email}`}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <EnvelopeIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Email
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <a
              href={`tel:${person.telephone}`}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              Call
            </a>
          </div>
        </div>
      </div> */}
    </li>
  );
}
