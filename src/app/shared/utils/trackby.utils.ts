/**
 * TrackBy functions for ngFor performance optimization
 */
export class TrackByUtils {
    static trackByIndex(index: number): number {
        return index;
    }

    static trackById<T extends { id: string | number }>(index: number, item: T): string | number {
        return item.id;
    }

    static trackByTitle<T extends { title: string }>(index: number, item: T): string {
        return item.title;
    }

    static trackByProperty<T>(property: keyof T) {
        return (index: number, item: T): T[keyof T] => item[property];
    }
}
