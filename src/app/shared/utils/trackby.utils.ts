/**
 * Common TrackBy functions for Angular *ngFor performance optimization
 * These functions help Angular track changes in arrays more efficiently
 */
export class TrackByUtils {
  /**
   * TrackBy function that uses the array index
   * Use this for simple arrays where the index is stable
   */
  static trackByIndex(index: number): number {
    return index;
  }

  /**
   * TrackBy function that uses an object's id property
   * Use this for arrays of objects with unique id properties
   */
  static trackById<T extends { id: string | number }>(index: number, item: T): string | number {
    return item.id;
  }

  /**
   * TrackBy function that uses an object's title property
   * Use this for arrays of objects with unique title properties
   */
  static trackByTitle<T extends { title: string }>(index: number, item: T): string {
    return item.title;
  }

  /**
   * Generic TrackBy function that uses a specified property
   * Use this for arrays of objects with any unique property
   */
  static trackByProperty<T>(property: keyof T) {
    return (index: number, item: T): T[keyof T] => item[property];
  }
}