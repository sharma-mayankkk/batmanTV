function ConfirmModal({
    open,
    title,
    description,
    confirmText = "Delete",
    cancelText = "Cancel",
    loading = false,
    onCancel,
    onConfirm,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

            <div
                className="
                    w-full
                    max-w-md
                    rounded-2xl
                    border
                    border-zinc-800
                    bg-zinc-900
                    p-6
                    shadow-2xl
                    animate-in
                    fade-in
                    zoom-in
                    duration-200
                "
            >

                <h2 className="text-xl font-semibold text-white">
                    {title}
                </h2>

                <p className="mt-3 text-zinc-400">
                    {description}
                </p>

                <div className="mt-6 flex justify-end gap-3">

                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="
                            rounded-full
                            px-5
                            py-2
                            text-zinc-300
                            transition
                            hover:bg-zinc-800
                            disabled:opacity-50
                        "
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="
                            rounded-full
                            bg-red-600
                            px-5
                            py-2
                            font-medium
                            text-white
                            transition
                            hover:bg-red-700
                            disabled:opacity-50
                        "
                    >
                        {loading ? "Deleting..." : confirmText}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ConfirmModal;