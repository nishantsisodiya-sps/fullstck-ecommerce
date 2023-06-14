import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-super-admin-home',
  templateUrl: './super-admin-home.component.html',
  styleUrls: ['./super-admin-home.component.css']
})
export class SuperAdminHomeComponent implements OnInit {
  classList: any;

  constructor(private renderer : Renderer2) { }

  ngOnInit(): void {
    this.toggleSidebar()
  }


  toggleSidebar(){
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
      this.renderer.listen(menuToggle, 'click', (event: Event) => {
        event.preventDefault();
        const wrapper = document.getElementById('wrapper');
        if (wrapper) {
          this.renderer.addClass(wrapper, 'toggled');
        }
      });
    }
  }
  }
