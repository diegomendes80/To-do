#include <stdio.h>

int main(){
    int tamanhoVetor1; 
    int tamanhoVetor2; 
    int contador=0;
    int vetor1[1000];
    int vetor2[1000];
    int vetor3[10000];

    printf("Digite o tamanho do vetor 1: ");
    scanf("%d", &tamanhoVetor1);

    for(int i=0; i < tamanhoVetor1; i++){
        int numAtual;
        scanf("%d", &vetor1[i]);
    }

    printf("Digite o tamanho do vetor 2: ");
    scanf("%d", &tamanhoVetor2);

    for(int i=0; i < tamanhoVetor2; i++){
        scanf("%d", &vetor2[i]);
    }

    
     for(int i=0; i < tamanhoVetor1; i++){
        if(vetor1[i] % 2 != 0){
            vetor3[i] = vetor1[i];
            contador++;
        } 
    }

    contador++;

     for(int i=0; i < tamanhoVetor2; i++){
        if(vetor1[i] % 2 == 0){
             vetor3[contador] = vetor2[i];
             contador++;
        }
    }

    for(int i=0; i < contador; i++){
        printf("%d, ", vetor3[i]);
    }

}