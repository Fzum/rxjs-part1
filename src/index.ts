import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

const environment = "http://localhost:8080";

export interface Paket {
  id: string;
  imageIds: string[];
}

export interface PaketWithImage extends Paket {
  imageUrls: string[];
}

const pakete$: Observable<Paket[]> = Observable.create((observer: any) => {
  observer.next([
    {
      id: "1",
      imageIds: ["1", "2", "3"],
    },
    {
      id: "2",
      imageIds: ["4", "5", "6"],
    },
    {
      id: "3",
      imageIds: ["7", "8", "9"],
    },
  ]);
});

const populateWithImageUrls = () =>
  map((p: Paket[]) => {
    return p.map(
      (px: Paket) =>
        ({
          ...px,
          imageUrls: px.imageIds.map((id) => `${environment}/images/${id}`),
        } as PaketWithImage)
    );
  });

pakete$
  .pipe(tap(console.log), populateWithImageUrls(), tap(console.log))
  .subscribe();
