#include <iostream>
using namespace std;

char array[10] = {'o','1','2','3','4','5','6','7','8','9'};
void show();
int check();

int main()
{
	int player = 1,i,selection;
	char mark;
	do
	{
		show();
		player=(player%2)?1:2;
		cout << "Player " << player << ", enter a number:  ";
		cin >> selection;
		mark=(player == 1) ? 'X' : 'O';
		if (selection == 1 && array[1] == '1')
			array[1] = mark;
		else if (selection == 2 && array[2] == '2')
			array[2] = mark;
		else if (selection == 3 && array[3] == '3')
			array[3] = mark;
		else if (selection == 4 && array[4] == '4')
			array[4] = mark;
		else if (selection == 5 && array[5] == '5')
			array[5] = mark;
		else if (selection == 6 && array[6] == '6')
			array[6] = mark;
		else if (selection == 7 && array[7] == '7')
			array[7] = mark;
		else if (selection == 8 && array[8] == '8')
			array[8] = mark;
		else if (selection == 9 && array[9] == '9')
			array[9] = mark;
		else
		{
			cout<<"Invalid move ";
			player--;
			cin.ignore();
			cin.get();
		}
		i=check();
		player++;
	}while(i==-1);
	show();
	if(i==1)
		cout<<"==>\aPlayer "<<--player<<" win ";
	else
		cout<<"==>\aGame draw";
	cin.ignore();
	cin.get();
	return 0;
}

//check

int check()
{
	if (array[1] == array[2] && array[2] == array[3])
		return 1;
	else if (array[1] == array[4] && array[4] == array[7])
		return 1;
	else if (array[1] == array[5] && array[5] == array[9])
		return 1;
	else if (array[4] == array[5] && array[5] == array[6])
		return 1;
	else if (array[2] == array[5] && array[5] == array[8])
		return 1;
	else if (array[7] == array[8] && array[8] == array[9])
		return 1;
	else if (array[3] == array[6] && array[6] == array[9])
		return 1;
	else if (array[3] == array[5] && array[5] == array[7])
		return 1;
	else if (array[1] != '1' && array[2] != '2' && array[3] != '3' && array[4] != '4' && array[5] != '5' && array[6] != '6' && array[7] != '7' && array[8] != '8' && array[9] != '9')
		return 0;
	else
		return -1;
}

//output show

void show()
{
	system("cls");
	cout << "\n\n\tTic Tac Toe\n\n";
	cout << "Player 1 (X)  -  Player 2 (O)" << endl << endl;
	cout << endl;
	cout << "     |     |     " << endl;
	cout << "  " << array[1] << "  |  " << array[2] << "  |  " << array[3] << endl;
	cout << "_____|_____|_____" << endl;
	cout << "     |     |     " << endl;
	cout << "  " << array[4] << "  |  " << array[5] << "  |  " << array[6] << endl;
	cout << "_____|_____|_____" << endl;
	cout << "     |     |     " << endl;
	cout << "  " << array[7] << "  |  " << array[8] << "  |  " << array[9] << endl;
	cout << "     |     |     " << endl << endl;
}

