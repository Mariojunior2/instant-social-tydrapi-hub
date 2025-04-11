
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { GraduationCap, Book, Clock, CalendarCheck } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  // Função para determinar qual ícone acadêmico usar com base no tipo
  const getAcademicIcon = (type: string | undefined) => {
    switch (type) {
      case "homework":
        return <Book className="h-5 w-5 text-blue-400" />
      case "exam":
        return <GraduationCap className="h-5 w-5 text-yellow-400" />
      case "deadline":
        return <Clock className="h-5 w-5 text-red-400" />
      case "event":
        return <CalendarCheck className="h-5 w-5 text-green-400" />
      default:
        return null
    }
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, academicType, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex items-start gap-3">
              {academicType && (
                <div className="flex-shrink-0 mt-0.5">
                  {getAcademicIcon(academicType)}
                </div>
              )}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
