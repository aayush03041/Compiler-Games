#include<iostream>
using namespace std;

pair<int,int> emptyspace(int board[][9]){
	pair<int,int> a;
	a.first=-1;
	a.second=-1;
	for(int i=0;i<9;i++){
		for(int j=0;j<9;j++){
			if(board[i][j]==0){
				a.first=i;
				a.second=j;
				return a;
			}
		}
	}
	return a;
}

bool ifpossible(int board[][9],pair<int,int> a,int value){
	//for rows
	for(int i=0;i<9;i++){
		if(board[a.first][i]==value){
			return false;
		}
	}
	
	//for column
	for(int i=0;i<9;i++){
		if(board[i][a.second]==value){
			return false;
		}
	}
	
	//for the box there
	int starting_row=a.first/3;
	starting_row*=3;
	int starting_column=a.second/3;
	starting_column*=3;
	for(int i=starting_row;i<starting_row+3;i++){
		for(int j=starting_column;j<starting_column+3;j++){
			if(board[i][j]==value){
				return false;
			}
		}
	}
	
	return true;
	
	
}

bool solvesoduku(int board[][9]){
	pair<int,int> a=emptyspace(board);
	if(a.first==-1) return true; //because all the space are filled
	else{
		for(int i=1;i<=9;i++){
			if(ifpossible(board,a,i)){
				board[a.first][a.second]=i;
				if(solvesoduku(board)){
					return true;
				}
				else{
					board[a.first][a.second]=0;
				}
			}
		}
		return false;
	}
	
}

int main(){
	int board[9][9];
	for(int i=0;i<9;i++){
		for(int j=0;j<9;j++){
			cin>>board[i][j];
		}
	}
	bool a=solvesoduku(board);
		for(int i=0;i<9;i++){
			for(int j=0;j<9;j++){
				cout<<board[i][j]<<" ";
			}
			cout<<endl;
		}
	
}

/* 5 2 0 0 0 0 0 0 0
  0 8 7 0 0 0 0 3 1
  0 0 3 0 1 0 0 8 0
  9 0 0 8 6 3 0 0 5
  0 5 0 0 9 0 6 0 0
  1 3 0 0 0 0 2 5 0
  0 0 0 0 0 0 0 7 4
  0 0 5 2 0 6 3 0 0*/
