export function translateServerMessage(msg) {
    switch (msg) {
        case "Incorrect email or password!":
            return "អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ!";
        case "Invalid input data":
            return "ទិន្នន័យដែលបានបញ្ចូលមិនត្រឹមត្រូវទេ!";
        case "Unauthorized":
            return "សូមចូលគណនីម្តងទៀត!";
        default:
            return msg || "មានបញ្ហាដែលមិនស្គាល់";
    }
}
