export const isValidIp = (ip) => {
    const ipv4 = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

    // IPv6 simplificado (no perfecto pero práctico)
    const ipv6 = /^([0-9a-fA-F]{1,4}:){1,7}[0-9a-fA-F]{1,4}$/;

    return ipv4.test(ip) || ipv6.test(ip);
};