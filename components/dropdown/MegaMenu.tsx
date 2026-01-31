export function MegaMenu({ name }: { name: string }) {
    /**
     * Not Use Yet
     */
    return (
        <div className="absolute z-20 left-0 top-[125%] w-full invisible opacity-0 border border-gray-200 group-hover:visible group-hover:opacity-100 group-hover:top-full transition-all duration-300 p-4 bg-white shadow-lg rounded-b-2xl">
            <h2>{name}</h2>
        </div>
    )
}