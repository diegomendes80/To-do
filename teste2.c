#include <stdio.h>



int main(){
    int tamanho1, tamanho2;
    int vetor1[1000];
    int vetor2[1000];
    int vetor3[2000];

    printf("vetor1 ");
    scanf("%d", &tamanho1);
    for(int i=0; i < tamanho1; i++){
        scanf("%d", &vetor1[i]);
    }

    printf("vetor2 ");
    scanf("%d", &tamanho2);
    for(int i=0; i < tamanho2; i++){
        scanf("%d", &vetor2[i]);
    }


    if(tamanho1 < tamanho2){
        int contador=0;
      for(int i=0; i < tamanho1; i++){
          vetor3[i] = vetor1[i];
          vetor3[i+1] = vetor2[i];
          contador++;
        }

    }else{
        int contador=0;

        for(int i=0; i < tamanho2; i++){
          vetor3[i] = vetor2[i];
          vetor3[i+1] = vetor1[i];
          contador++;
        }

      
    }

   
    for(int i=0; i < (tamanho1+tamanho2); i++){
        printf("%d ", vetor3[i]);
    }

}