pragma solidity 0.8.0;

// We first import some OpenZeppelin Contracts.
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

// We need to import the helper functions from the contract that we copy/pasted.
import {Base64} from './libraries/Base64.sol';

// We inherit the contract we imported. This means we'll have access
// to the inherited contract's methods.
contract MyEpicNFT is ERC721URIStorage {
  // Magic given to us by OpenZeppelin to help us keep track of tokenIds.
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  uint256 private _totalSupply;

  // We split the SVG at the part where it asks for the background color.
  string svgPartOne =
    "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='";
  string svgPartTwo =
    "'/><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

  string[] firstWords = [
    'Code',
    'Burger',
    'Banana',
    'Cake',
    'Tool',
    'Gear',
    'Jacket',
    'Desk',
    'Odd',
    'Tale',
    'Building',
    'Sweep'
  ];
  string[] secondWords = [
    'Cat',
    'Bounce',
    'Tree',
    'Deck',
    'Boat',
    'Winter',
    'Sun',
    'Dark',
    'Hngry',
    'Candy',
    'Red',
    'Beard',
    'Towel',
    'Car'
  ];
  string[] thirdWords = [
    'However',
    'Help',
    'Axe',
    'Battle',
    'Hammer',
    'Fly',
    'Riddle',
    'Fun',
    'Property',
    'Point',
    'Camera',
    'Key',
    'Function',
    'Law',
    'String'
  ];

  // Get fancy with it! Declare a bunch of colors.
  string[] colors = ['red', '#08C2A8', 'black', 'yellow', 'blue', 'green'];

  event NewEpicNFTMinted(address sender, uint256 tokenId);

  // We need to pass the name of our NFTs token and it's symbol.
  constructor(uint256 supply) ERC721('SquareNFT', 'SQUARE') {
    _totalSupply = supply;
  }

  // I create a function to randomly pick a word from each array.
  function pickRandomFirstWord(uint256 tokenId)
    public
    view
    returns (string memory)
  {
    // I seed the random generator. More on this in the lesson.
    uint256 rand = random(
      string(abi.encodePacked('FIRST_WORD', Strings.toString(tokenId)))
    );
    // Squash the # between 0 and the length of the array to avoid going out of bounds.
    rand = rand % firstWords.length;
    return firstWords[rand];
  }

  function pickRandomSecondWord(uint256 tokenId)
    public
    view
    returns (string memory)
  {
    uint256 rand = random(
      string(abi.encodePacked('SECOND_WORD', Strings.toString(tokenId)))
    );
    rand = rand % secondWords.length;
    return secondWords[rand];
  }

  function pickRandomThirdWord(uint256 tokenId)
    public
    view
    returns (string memory)
  {
    uint256 rand = random(
      string(abi.encodePacked('THIRD_WORD', Strings.toString(tokenId)))
    );
    rand = rand % thirdWords.length;
    return thirdWords[rand];
  }

  // Same old stuff, pick a random color.
  function pickRandomColor(uint256 tokenId)
    public
    view
    returns (string memory)
  {
    uint256 rand = random(
      string(abi.encodePacked('COLOR', Strings.toString(tokenId)))
    );
    rand = rand % colors.length;
    return colors[rand];
  }

  function random(string memory input) internal pure returns (uint256) {
    return uint256(keccak256(abi.encodePacked(input)));
  }

  function getTotalNFTsMined() public view returns (uint256) {
    return _tokenIds.current();
  }

  function makeAnEpicNFT() public {
    require(_tokenIds.current() < _totalSupply, 'Max Supply of tokens reached');
    uint256 newItemId = _tokenIds.current();

    string memory first = pickRandomFirstWord(newItemId);
    string memory second = pickRandomSecondWord(newItemId);
    string memory third = pickRandomThirdWord(newItemId);
    string memory combinedWord = string(abi.encodePacked(first, second, third));

    // Add the random color in.
    string memory randomColor = pickRandomColor(newItemId);
    string memory finalSvg = string(
      abi.encodePacked(
        svgPartOne,
        randomColor,
        svgPartTwo,
        combinedWord,
        '</text></svg>'
      )
    );

    string memory json = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            '{"name": "',
            combinedWord,
            '", "description": "A highly acclaimed collection of squares.", "image": "data:image/svg+xml;base64,',
            Base64.encode(bytes(finalSvg)),
            '"}'
          )
        )
      )
    );

    string memory finalTokenUri = string(
      abi.encodePacked('data:application/json;base64,', json)
    );

    // console.log('\n--------------------');
    // console.log(finalTokenUri);
    // console.log('--------------------\n');

    _safeMint(msg.sender, newItemId);

    _setTokenURI(newItemId, finalTokenUri);

    _tokenIds.increment();
    // console.log('An NFT w/ ID %s has been minted to %s', newItemId, msg.sender);
    emit NewEpicNFTMinted(msg.sender, newItemId);
  }

  function totalSupply() public view virtual returns (uint256) {
    return _totalSupply;
  }
}
