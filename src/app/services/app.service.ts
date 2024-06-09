import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {sleep} from '@/utils/helpers';
import { Usuario } from '@/models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class AppService {

  public usuarioAutenticado: boolean = false;
  public usuarioLogado: Usuario = new Usuario();

  constructor(
      private router: Router,
      private toastr: ToastrService
  ) {
      // onAuthStateChanged(
      //     firebaseAuth,
      //     (user) => {
      //         if (user) {
      //             this.user = user;
      //         } else {
      //             this.user = undefined;
      //         }
      //     },
      //     (e) => {
      //         this.user = undefined;
      //     }
      // );
  }

  deslogar() {
    this.usuarioAutenticado = false;
    this.usuarioLogado = new Usuario();
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

    // async registerWithEmail(email: string, password: string) {
    //     try {
    //         const result = await createUserWithEmailAndPassword(
    //             firebaseAuth,
    //             email,
    //             password
    //         );
    //         this.user = result.user;
    //         this.router.navigate(['/']);
    //         return result;
    //     } catch (error) {
    //         this.toastr.error(error.message);
    //     }
    // }

    // async loginWithEmail(email: string, password: string) {
    //     try {
    //         const result = await signInWithEmailAndPassword(
    //             firebaseAuth,
    //             email,
    //             password
    //         );
    //         this.user = result.user;
    //         this.router.navigate(['/']);

    //         return result;
    //     } catch (error) {
    //         this.toastr.error(error.message);
    //     }
    // }

    // async signInByGoogle() {
    //     try {
    //         const result = await signInWithPopup(firebaseAuth, provider);
    //         this.user = result.user;
    //         this.router.navigate(['/']);

    //         return result;
    //     } catch (error) {
    //         this.toastr.error(error.message);
    //     }
    // }

    // async getProfile() {
    //     try {
    //         await sleep(500);
    //         const user = firebaseAuth.currentUser;
    //         if (user) {
    //             this.user = user;
    //         } else {
    //             this.logout();
    //         }
    //     } catch (error) {
    //         this.logout();
    //         this.toastr.error(error.message);
    //     }
    // }

    // async logout() {
    //     await firebaseAuth.signOut();
    //     this.user = null;
    //     this.router.navigate(['/login']);
    // }
}
