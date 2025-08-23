import { useAlertStore } from '@/stores/alert_store'

export function success(msg) {
    const alert = useAlertStore()
    alert.show(msg, 'success')
}

export function error(msg) {
    const alert = useAlertStore()
    alert.show(msg, 'error')
}

export function info(msg) {
    const alert = useAlertStore()
    alert.show(msg, 'info')
}
