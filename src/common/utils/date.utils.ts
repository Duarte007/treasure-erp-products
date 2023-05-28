export class DateUtils {
    public static utcISOString(): string {
        // Note: following method always returns an UTC timestamp
        return new Date().toISOString()
    }
}
