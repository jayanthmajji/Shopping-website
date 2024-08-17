import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export default function CheckoutSuccess({
  open,
  setOpen,
  totalprice,
  clearCart,
}) {
  const handleOnClose = (e) => {
    clearCart();
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="mt-3 text-center  relative align-middle p-8">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  color="success"
                  className="size-16 absolute left-52"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div className="p-16 text-start font-semibold text-xl mt-4">
                <p>Total Price: {totalprice}</p>
              </div>
            </div>
            <div className="bg-gray-50  sm:flex sm:flex-row-reverse sm:px-6 justify-center ">
              <button
                type="button"
                data-autofocus
                onClick={() => {
                  handleOnClose();
                }}
                className="mb-4 inline-flex w-full justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Continue Shoping
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
