import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  deleteField,
  doc,
  docData,
  Firestore,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { concatMap, from, map, Observable, of, switchMap, take } from 'rxjs';
import { addDoc, updateDoc } from '@firebase/firestore';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  UserInfo,
} from '@angular/fire/auth';
import {
  getStorage,
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { UyeModel } from '../models/uyeModel';
import { url } from 'inspector';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root',
})
export class FirebaseServiceService {
  aktifUye = authState(this.auth);
  constructor(
    public fs: Firestore,
    public auth: Auth,
    public storage: Storage
  ) {}

  KayitOl(mail: string, parola: string) {
    return from(createUserWithEmailAndPassword(this.auth, mail, parola));
  }

  OturumAc(mail: string, parola: string) {
    return from(signInWithEmailAndPassword(this.auth, mail, parola));
  }
  OturumKapat() {
    return from(this.auth.signOut());
  }

  get AktifUyeBilgi() {
    return this.aktifUye.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.fs, 'Uyeler', user?.uid);
        return docData(ref) as Observable<UyeModel>;
      })
    );
  }

  // Member

  ListOfUsers() {
    var ref = collection(this.fs, 'Uyeler');
    return this.aktifUye.pipe(
      concatMap((user) => {
        const myQuery = query(ref);
        return collectionData(myQuery, { idField: 'uid' }) as Observable<
          UyeModel[]
        >;
      })
    );
  }

  ListOfMembers() {
    var ref = collection(this.fs, 'Uyeler');
    return collectionData(ref, { idField: 'uid' }) as Observable<UyeModel[]>;
  }

  AddMember(uye: UyeModel) {
    var ref = doc(this.fs, 'Uyeler', uye.uid!);
    return from(setDoc(ref, uye));
  }

  UyeEkle(uye: UyeModel) {
    var ref = collection(this.fs, 'Uyeler');
    return this.aktifUye.pipe(
      take(1),
      concatMap((user) =>
        addDoc(ref, {
          displayName: uye?.displayName,
          kullaniciAdminMi: uye.kullaniciAdminMi,
          kullaniciEmail: uye.kullaniciEmail,
          kullaniciKadi: uye.kullaniciKadi,
          kullaniciKayitTarihi: uye.kullaniciKayitTarihi,
          kullaniciSifre: uye.kullaniciSifre,
          kullaniciSoyad: uye.kullaniciSoyad,
        })
      ),
      map((ref) => ref.id)
    );
  }

  EditMember(uye: UyeModel) {
    var ref = doc(this.fs, 'Uyeler/', uye.uid!);
    return updateDoc(ref, { ...uye });
  }

  DeleteMember(uye: UyeModel) {
    var ref = doc(this.fs, 'Uyeler/', uye.uid!);
    return deleteDoc(ref);
  }
}