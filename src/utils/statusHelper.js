export function translateStatusMessage(msg) {
    switch (msg) {
        case "confirmed":
            return "បានបញ្ជាក់";
        case "processing":
            return "រៀបចំទំនិញចេញ!";
        case "shipped":
            return "ទំនិញដឹកចេញពីឃ្លាំង";
        case "delivered":
            return "ជោគជ័យ"
        case "cancelled":
            return "បានបដិសេធ"
        default:
            return msg || "មានបញ្ហាដែលមិនស្គាល់";
    }
}