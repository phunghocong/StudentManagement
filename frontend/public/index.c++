#include<iostream>
#include<algorithm>
using namespace std;

void nhap(int a[],int n){
    for(int i = 0; i < n; i++){
        cin >> a[i];
    }
}

void xuat(int a[],int n){
    for(int i = 0; i < n; i++){
        cout << a[i] << " ";
    }
}

int timKiem(int a[],int n,int key){
    for(int i = 0; i < n; i++){
        if(a[i] == key){
            return i;
        }
    }
}
void sapXepTangDan(int a[], int n){
    int temp;
    for(int i = 0; i < n - 1; i++){
        for(int j = i + 1; j < n; j++){
            if(a[i] > a[j]){
                temp = a[i];
                a[i] = a[j];
                a[j] = temp;
            }
        }
    }
}

void XoaPhanTu(int a[], int &n, int pos){
    if(n <= 0){
        return;
    }
    if(pos < 0){
        pos = 0;
    }
    else if(pos >= n){
        pos = n-1;
    }
    for(int i = pos; i < n - 1; i++){
        a[i] = a[i+1];
    }
    --n;
}
void sapXepGiamDan(int a[], int n){
    int tg;
    for(int i = 0; i < n - 1; i++){
        for(int j = i + 1; j < n; j++){
            if(a[i] < a[j]){
                tg = a[i];
                a[i] = a[j];
                a[j] = tg;
            }
        }
    }
}

void ThemPhanTu(int a[], int &n, int val, int pos){
    //int length = sizeof a / sizeof(int);
    if(n >= 1000){
        return;
    }
    if(pos < 0){
        pos = 0;
    }
    else if(pos > n){
        pos = n;
    }
    for(int i = n; i > pos; i--){
        a[i] = a[i-1];
    }
    a[pos] = val;
    ++n;
}
int main(){
    int n, pos, val;
    cout << "Nhap so luong phan tu mang: "; cin >> n;
    cout << "Nhap vi tri can them/xoa: "; cin >> pos;
    cout << "Nhap gia tri them: "; cin >> val;
    int a[1000];
    cout << "Nhap cac phan tu cua mang: ";
    nhap(a, n);
    ThemPhanTu(a, n, 5, 3);
    xuat(a, n);
    //cout << timKiem(a, n, k);
    //sapXepTangDan(a, n);
    //xuat(a, n);
}