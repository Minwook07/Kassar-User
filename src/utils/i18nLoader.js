export function loadLocaleMessages() {
    const messages = {};

    // Khmer
    const kmModules = import.meta.glob('../lang/km/*.json', { eager: true });
    messages.km = {};
    for (const path in kmModules) {
        const key = path.split('/').pop().replace('.json', '');
        messages.km[key] = kmModules[path];
    }

    // English
    const enModules = import.meta.glob('../lang/en/*.json', { eager: true });
    messages.en = {};
    for (const path in enModules) {
        const key = path.split('/').pop().replace('.json', '');
        messages.en[key] = enModules[path];
    }

    return messages;
}
