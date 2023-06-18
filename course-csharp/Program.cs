using Bank;
using System.Text.Json;
using System.Text.Json.Serialization;

class Program
{
  static void Main()
  {
    int[] numbers = { 1, 4, 8, 10, 42};

    var n = numbers.OrderByDescending(number => number);

    var accounts = new List<BankAccount>
    {
      new BankAccount("Gustavo", 100) 
      { 
        Branch = "123",
      },
      new BankAccount("John", 50)
      {
        Branch = "321"
      },
      new BankAccount("Mark", 50)
      {
        Branch = "456"
      }
    };

    var acc = accounts.GroupBy(account => account.Branch);

    foreach (var group in acc)
    {
      Console.WriteLine($"Agência: {group.Key}");
      Console.WriteLine("---");
      foreach (var account in group)
      {
        Console.WriteLine($"{account.Name} possui {account.Balance}");
      }
      Console.WriteLine("---");
    }

    var namesQuery = accounts.Select(account => new { account.Name, account.Branch });

    var test = Enumerable.Empty<int>();
 
    var random = new Random();
    var range = Enumerable.Range(0, 27)
                          .Select(number => (char)('a' + number));
  }
}

static class Extensions
{
  public static void WriteLine(this string text, ConsoleColor color)
  {
    Console.ForegroundColor = color;
    Console.WriteLine(text);
    Console.ResetColor();
  }

  public static int Test(this int number)
  {
    return 1;
  }
}

namespace Bank
{
  public class FileLogger : ILogger
  {
    private readonly string filePath;

    public FileLogger(string filePath)
    {
      this.filePath = filePath;
    }

    public void Log(string message)
    {
      File.AppendAllText(filePath, $"{message}{Environment.NewLine}");
    }
  }

  public class ConsoleLogger : ILogger
  {
  }

  public interface ILogger
  {
    void Log(string message)
    {
      Console.WriteLine($"LOGGER: {message}");
    }
  }

  public class BankAccount
  {
    private readonly ILogger logger;

    public string Name
    {
      get; private set;
    }

    public decimal Balance 
    { 
      get; private set;
    }

    public string Branch;

    [JsonConstructor]
    public BankAccount(string name, decimal balance) : this(name, balance, new ConsoleLogger())
    {
    }
    public BankAccount(string name, decimal balance, ILogger logger)
    {
      if (string.IsNullOrWhiteSpace(name))
      {
        throw new ArgumentException("Nome inválido.", nameof(name));
      }
      if (balance < 0)
      {
        throw new Exception("Saldo não pode ser negativo.");
      }
      Name = name;
      Balance = balance;
      this.logger = logger;
    }

    public void Deposit(decimal amount)
    {
      if (amount <= 0)
      {
        logger.Log($"Não é possível depositar {amount} na conta de {Name}.");
        return;
      }

      Balance += amount;
    }
  }
}