import toast from "react-hot-toast";

export const handleFormEvent = (formData: FormData) => {
    const email: string = formData.get('email') as string;

    if (!email.trim()) {
        toast.error("Please fill the email if you want to subscribe", { duration: 5000 })
        return;
    }
    toast.success(`Successfully subscribe for person with email: ${email}`)

    // Call API here
}